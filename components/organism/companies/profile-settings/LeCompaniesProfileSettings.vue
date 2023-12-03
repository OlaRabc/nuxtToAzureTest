<template>
  <!--  action="http://localhost:8080/patchCompany/36"-->

  <Container>
    <form
      method="post"
      enctype="multipart/form-data"
      @submit="sendRegionsAndExperies"
    >
      <Row class="justify-center mt-16 mb-16">
        <Col
          :md="5"
          :offset-md="1"
          class="flex flex-col items-center md:order-2"
        >
          <LeFileUploader
            label="Dodaj zdjęcie profilowe"
            :acceptableFileTypes="['jpg', 'jpeg', 'svg', 'webp', 'png']"
            name="profile"
          />

          <div class="text-center">
            <LeHeading variant="h4"> Udostepnij numer telefonu: </LeHeading>
            <LeSwitch
              name="isPhoneVisible"
              :checked="newData.showPhone"
              checkLabel="Tak"
              uncheckLabel="Nie"
              @onChange="changeShowPhone"
            />
            <LeInput
              id="phone"
              name="phone"
              type="tel"
              :value="newData.phone"
              placeholder="Numer telefonu"
              pattern="[0-9]{9}"
              class="mb-8"
              @onChange="changePhone"
            />
          </div>
        </Col>

        <Col
          :md="6"
          class="flex flex-col justify-start max-md:text-center self-stretch md:order-1"
        >
          <LeBox>
            <LeHeading type="h1" variant="h2">
              {{ newData?.name }}
            </LeHeading>

            <LeTextarea
              class="max-h-[330px] mb-8 rounded-xl overflow-y-auto"
              id="description"
              name="description"
              :value="newData.description"
              placeholder="Opisz co robi twoja firma"
              :rows="10"
              @onChange="changeDescription"
            />
          </LeBox>
        </Col>
      </Row>

      <Row class="justify-around !items-stretch mb-32 max-md:mx-16">
        <Col :md="5" class="mb-8">
          <LeExpertiseBoxWithEditing
            :expertiseList="newData?.expertList"
            @onClick="companiesStore.openExpertiseModal()"
          />
        </Col>

        <Col :md="5">
          <LeRegionBoxWithEditing
            :regionsList="newData?.companyRegionList"
            @onClick="companiesStore.openRegionModal()"
          />
        </Col>
      </Row>

      <Row class="justify-around !items-stretch mb-32 max-md:mx-16">
        <Col :md="5" class="flex justify-around mb-8">
          <LeBtnLink to="/" variant="red" size="xl"> Anuluj</LeBtnLink>
          <LeBtn size="xl" type="submit"> Zapisz</LeBtn>
        </Col>
      </Row>
    </form>

    <LeAddExpertiseModal
      :selectedDataList="newData.expertList"
      :fullDataList="fullExpertiseList"
      @onSaveAndClose="updateExpertiseList"
    />

    <LeAddRegionsModal
      :selectedDataList="newData.companyRegionList"
      :fullCityList="cityList"
      :fullScopeList="scopeList"
      @onSaveAndClose="updateRegionList"
    />
    {{ newData.expertList }}
  </Container>
</template>

<script setup lang="ts">
import { useCompaniesProfileSettings } from "~/stores/companiesProfileSettings";
const companiesStore = useCompaniesProfileSettings();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const { data: fullExpertiseList } = await useFetch(`${apiUrl}/expert`);
const { data: scopeList } = await useFetch(`${apiUrl}/scope`);
const { data: cityList } = await useFetch(`${apiUrl}/city`);

onMounted(() => {
  loadData();
});

const newData = ref({
  name: "",
  description: "",
  phone: "",
  showPhone: false,
  expertList: [],
  companyRegionList: [],
  profile: null,
  gallery: "",
});
const loadData = async () => {
  try {
    await fetch(`${apiUrl}/company/36`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        newData.value.name = data.name;
        newData.value.description = data.description;
        newData.value.phone = data.phone;
        newData.value.showPhone = data.showPhone;
        newData.value.expertList = data.expertList;
        newData.value.companyRegionList = data.companyRegionList;
        newData.value.profile = data.profile;
        newData.value.gallery = data.gallery;
      })
      .catch((error) => {
        console.error("Wystąpił błąd:", error);
      });
  } catch (e) {
    console.error("Wystąpił błąd:", e);
  }
};
const changeDescription = (val: String) => (newData.value.description = val);
const changePhone = (val: String) => (newData.value.phone = val);

const changeShowPhone = () =>
  (newData.value.showPhone = !newData.value.showPhone);

const updateExpertiseList = (newList) => {
  newData.value.expertList = newList;
};

const updateRegionList = (newList) => {
  newData.value.companyRegionList = newList;
};

const sendRegionsAndExperies = async () => {
  await fetch(`${apiUrl}/set-regions-and-experies/36`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expertList: newData.value.expertList,
      regionList: newData.value.companyRegionList,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
};
</script>
