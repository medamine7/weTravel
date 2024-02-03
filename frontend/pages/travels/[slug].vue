<template>
  <x-container v-if="data" class="pt-12">
    <div class="flex justify-between items-start gap-6 flex-wrap">
      <h2 class="text-4xl font-bold max-w-2xl">{{ data.title }}</h2>
      <div class="flex gap-4 items-center flex-shrink-0" v-if="canEdit">
        <x-button
          kind="danger"
          icon="heroicons:x-mark"
          icon-size="18px"
          data-modal-target="wt-dialog"
          data-modal-toggle="wt-dialog"
          >Delete</x-button
        >
        <x-button
          kind="secondary"
          icon="heroicons:pencil-solid"
          icon-size="18px"
          data-drawer-target="wt-drawer"
          data-drawer-toggle="wt-drawer"
          data-drawer-placement="right"
          >Edit</x-button
        >
      </div>
    </div>
    <travel-gallery :images="data.images" />
    <h5 class="text-2xl font-bold mt-8 mb-4">About the travel</h5>

    <p class="text-base">{{ data.description }}</p>

    <div class="flex justify-between items-center gap-4 mt-8 mb-4">
      <h5 class="text-xl font-bold mt-8 mb-4">Upcoming tours</h5>
      <x-button
        kind="secondary"
        icon="heroicons:plus"
        icon-size="18px"
        data-drawer-target="wt-drawer-tour"
        data-drawer-toggle="wt-drawer-tour"
        data-drawer-placement="right"
        v-if="canEdit"
        >Add tour</x-button
      >
    </div>
    <x-table
      :thead="tableHeads"
      :tbody="tableData"
      v-if="data.tours.length"
      @delete="onDeleteTour"
    >
      <template v-slot:actions="{ index }" v-if="canEdit">
        <a
          href="#"
          class="font-medium text-red-600 hover:underline"
          @click.prevent="onDeleteTour(index)"
        >
          Delete</a
        >
      </template>
    </x-table>
    <h4 v-else class="text-lg my-4 text-stone-400">
      *No tours available at the moment*
    </h4>
  </x-container>
  <x-dialog v-if="canEdit">
    <Icon name="heroicons:exclamation-triangle" size="64px" />

    <h3 class="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this product?
    </h3>
    <div class="flex gap-4 w-full justify-center">
      <x-button data-modal-hide="wt-dialog" kind="danger" @click="onDelete">
        Yes, I'm sure
      </x-button>
      <x-button data-modal-hide="wt-dialog" kind="secondary">
        No, cancel
      </x-button>
    </div>
  </x-dialog>
  <x-drawer v-if="canEdit && data">
    <travel-form @submit="onEdit" :data="data">
      <template v-slot:header>
        <Icon name="maki:beach" />
        <span class="ml-2"> Edit travel </span>
      </template>
    </travel-form>
  </x-drawer>

  <x-drawer v-if="canEdit" id="wt-drawer-tour">
    <tour-form @submit="onAddTour" :data="activeTour">
      <template v-slot:header>
        <Icon name="heroicons:plus" />
        <span class="ml-2"> Add tour </span>
      </template>
    </tour-form>
  </x-drawer>
</template>

<script setup lang="ts">
  import type { UploadedImage } from "~/types/file";

  definePageMeta({
    layout: "main",
  });

  type EditPayload = Partial<{
    title: string;
    description: string;
    duration: number;
    isPublic: boolean;
    images: string[] | File[];
  }>;

  type TourPayload = {
    title: string;
    from: string;
    to: string;
    price: number;
  };

  const route = useRoute();
  const authState = useAuthStore();
  const { $api } = useNuxtApp();

  const activeTour = ref(null);

  const { data, refresh } = await useAsyncGql({
    operation: "getTravelBySlug",
    variables: {
      slug: route.params.slug as string,
    },
    options: {
      transform: (result) => result.travelBySlug,
    },
  });

  if (!data.value) throw new Error("Travel not found");

  const canEdit = computed(() =>
    hasPermission(authState.userRole, "travels", "write"),
  );

  const onEdit = async (payload: EditPayload) => {
    if (!canEdit) return;

    const hasNewImages = payload.images?.some(Boolean);
    let images: UploadedImage[] = [];

    if (hasNewImages) {
      images = await $api.travels.uploadFiles({
        files: payload.images as File[],
      });
    }

    const { updateTravel: updatedTravel } = await GqlUpdateTravel({
      input: {
        id: data.value!.id,
        title: payload.title,
        description: payload.description,
        public: payload.isPublic,
        duration: payload.duration,
        ...(images.length && { images }),
      },
    });

    refresh();

    const drawer = FlowbiteInstances.getInstance("Drawer", "wt-drawer");
    drawer.hide();
  };

  const onDelete = async () => {
    if (!canEdit) return;

    await GqlRemoveTravel({
      id: data.value!.id,
    });

    navigateTo("/travels");
  };

  const onAddTour = async (payload: TourPayload) => {
    if (!canEdit) return;

    const { createTour: newTour } = await GqlCreateTour({
      input: {
        travelId: data.value!.id,
        title: payload.title,
        from: payload.from,
        to: payload.to,
        price: payload.price,
      },
    });

    refresh();

    const drawer = FlowbiteInstances.getInstance("Drawer", "wt-drawer-tour");
    drawer.hide();
  };

  const onDeleteTour = async (index: number) => {
    if (!canEdit) return;

    const tour = data.value!.tours[index];
    await GqlRemoveTour({
      id: tour.id,
    });

    refresh();
  };

  const tableHeads = ["", "From", "To", "Price"];
  const tableData = computed(() => {
    if (!data.value) return null;

    return data.value.tours.map((tour) => [
      tour.title,
      tour.from?.split("T")[0],
      tour.to?.split("T")[0],
      `$${tour.price}`,
    ]);
  });
</script>
