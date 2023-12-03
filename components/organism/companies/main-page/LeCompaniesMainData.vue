<template>
  <Container>
    <Row class="h-screen" v-if="error">
      <LeErrorBox>
        {{ error }}
      </LeErrorBox>
    </Row>

    <Row class="justify-center mt-16 mb-16">
      <Col :md="5" :offset-md="1" class="flex flex-col items-center md:order-2">
        <LeGallery
          :profile="data?.profile"
          :gallery="data?.gallery"
          :companyName="data?.name"
          class="mb-8"
        />

        <div class="text-center">
          <div v-if="data.showPhone">
            <LeBtnLink :to="'tel:' + data?.phone" class="mb-4">
              Zadzwoń: {{ data?.phone }}
            </LeBtnLink>

            <p class="mb-4">lub</p>
          </div>

          <LeBtn @click="contactForm.open(data?.id)" class="mb-4">
            Wyślij formularz kontaktowy
          </LeBtn>
        </div>
      </Col>

      <Col
        :md="6"
        class="flex flex-col justify-start max-md:text-center self-stretch md:order-1"
      >
        <LeBox>
          <LeHeading type="h1" variant="h2">
            {{ data?.name }}
          </LeHeading>

          <LeParagraph
            class="max-h-[330px] mb-8 pr-2 rounded-xl overflow-y-auto"
          >
            {{ data.description ?? "Ta firma nie ma jeszcze opisu" }}
          </LeParagraph>
        </LeBox>
      </Col>
    </Row>

    <Row class="justify-around !items-stretch mb-32 max-md:mx-16">
      <Col :md="5" class="mb-8">
        <LeExpertiseBox :expertiseList="data?.expertList" />
      </Col>

      <Col :md="5">
        <LeRegionBox :regionsList="data?.companyRegionList" />
      </Col>
    </Row>

    <Row class="justify-center max-md:mx-16 mb-16">
      <Col :md="8">
        <LeRateBox
          :rates="data?.rate?.rateList"
          :totalNumberOfRatings="data?.rate?.rateCount"
        />
      </Col>
    </Row>

    <LeContactForm :companyId="data?.id" />
  </Container>
</template>

<script setup lang="ts">
import { useContactForm } from "~/stores/contactForm";
const contactForm = useContactForm();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const route = useRoute();

const { data, error } = await useFetch(`${apiUrl}/company/${route.params.id}`);
</script>
