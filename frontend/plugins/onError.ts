export default defineNuxtPlugin(() => {
  useGqlError(async (err: any) => {
    const authStore = useAuthStore();
    const router = useRouter();

    // Only log during development
    if (process.env.NODE_ENV !== "production") {
      for (const gqlError of err.gqlErrors) {
        console.error("[nuxt-graphql-client] [GraphQL error]", {
          client: err.client,
          statusCode: err.statusCode,
          operationType: err.operationType,
          operationName: err.operationName,
          gqlError,
        });
      }
    }

    const tokenExpired =
      err.gqlErrors.some((e: any) => e.message.includes("Unauthorized")) &&
      authStore.tokens.refresh;

    const invalidRefreshToken = err.gqlErrors.some((e: any) => e.message.includes("Invalid refresh token"));

    if (invalidRefreshToken) {
      authStore.$reset();
      useGqlToken(null);
      navigateTo("/login");
    }

    if (tokenExpired) {
      const newToken = await GqlRefreshToken({
        refreshToken: authStore.tokens.refresh as string,
      });

      authStore.updateTokens({
        access: newToken.refresh.accessToken,
      });

      useGqlToken(newToken.refresh.accessToken);

      router.go(0);
    }
  });
});
