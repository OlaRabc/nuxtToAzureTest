<template>
  <Container>
    <Row class="!justify-center">
      <Col :lg="10" class="flex mt-32">
        <LeSelect
          id="city"
          :options="cityList"
          search
          class="w-2/3 !mr-0 rounded-r-none shadow-[13px_7px_10px_2px_rgba(14,16,35,0.3)] z-[91]"
          @onChange="changeCityValue"
        >
          <slot> Wybierz region: </slot>
        </LeSelect>

        <LeSelect
          id="scope"
          :options="scopeList"
          @onChange="changeScopeValue"
          class="w-1/3 !ml-0 border-l rounded-l-none shadow-[10px_15px_10px_-4px_rgba(14,16,35,0.3)] z-[91]"
        />
      </Col>

      <Col :lg="10" class="mb-32">
        <LeSelect
          id="expertise"
          :options="expertiseList"
          search
          @onChange="changeExpertValue"
        >
          <slot> Wybierz typ usługi: </slot>
        </LeSelect>
      </Col>

      <Col>
        <div class="relative w-max mx-auto">
          <LeBtn size="lg" @click="findMatchingCompanies"> Szukaj </LeBtn>
          <client-only>
            <font-awesome-icon
              :icon="['fas', 'wrench']"
              class="absolute -top-8 -right-8 text-6xl -z-10"
            />

            <font-awesome-icon
              :icon="['fas', 'toolbox']"
              class="absolute -top-8 -left-8 text-6xl -z-10 -rotate-45"
            />
          </client-only>
        </div>
      </Col>
    </Row>

    <Row class="!justify-center my-8">
      <Col :col="11">
        <LeLoadinSection v-if="isLoading" />

        <LeErrorBox v-else-if="!isValid">
          Wszystkie pola muszą być uzupełnione
        </LeErrorBox>

        <LeErrorBox v-else-if="companiesError">
          Wystąpił błąd, spróbuj ponownie poźniej!
        </LeErrorBox>

        <LeErrorBox v-else-if="!companiesList.length && requestSent">
          Przepraszamy, ale nie znaleźliśmy pasującej firmy w wybranej okolicy.
        </LeErrorBox>

        <LeCompanyBox
          v-else-if="companiesList.length > 0"
          v-for="company in companiesList"
          :key="company.id"
          class="mb-12"
          :company="company"
          @openForm="openForm(company.id)"
        />
      </Col>
    </Row>

    <LeContactForm />
  </Container>
</template>

<script setup lang="ts">
import { useContactForm } from "~/stores/contactForm";
const contactForm = useContactForm();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const { data: scopeList } = await useFetch(`${apiUrl}/scope`);
const selectedScope = ref("");
const changeScopeValue = (val: any) => {
  selectedScope.value = val.value;
};

const { data: cityList } = await useFetch(`${apiUrl}/city`);
const selectedCity = ref("");
const changeCityValue = (val: any) => {
  selectedCity.value = val.id;
};

const { data: expertiseList } = await useFetch(`${apiUrl}/expert`);
const selectedExpertise = ref("");
const changeExpertValue = (val: any) => {
  selectedExpertise.value = val.id;
};

const companiesList = ref([]);
const companiesError = ref(false);
const isLoading = ref(false);
const requestSent = ref(false);
const isValid = ref(true);

const resetErrorsAndData = () => {
  companiesList.value = [];
  companiesError.value = false;
  requestSent.value = false;
  isLoading.value = true;
  isValid.value = true;
};
const isDataValid = () => {
  if (selectedScope.value && selectedCity.value && selectedExpertise.value) {
    return true;
  }
  return false;
};

const sendRequest = async () => {
  try {
    await fetch(
      `${apiUrl}/company/matching/${selectedCity.value}/${selectedScope.value}/${selectedExpertise.value}`,
    )
      .then((response) => response.json())
      .then((response) => {
        requestSent.value = true;
        companiesList.value = response;
      })
      .catch((e) => {
        companiesError.value = true;
        console.error(e);
      });
  } catch (e) {
    companiesError.value = true;
    console.error(e);
  }
};
const findMatchingCompanies = async () => {
  resetErrorsAndData();

  if (isDataValid()) {
    await sendRequest();
  } else {
    isValid.value = false;
  }

  isLoading.value = false;
};

const openForm = (id: Number): void => {
  contactForm.open();
  contactForm.setId(id);
};
</script>
