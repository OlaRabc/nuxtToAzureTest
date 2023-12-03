<template>
  <div>
    <LeModal
      v-if="sessionStore.isLogged && !sessionStore.isCompany"
      :isOpen="contactForm.isOpen"
      closeOnBg
      closeBtn
      @onClose="closeForm"
    >
      <LeHeading variant="h3" class="text-center">
        Napisz aby nawiązać współpracę
      </LeHeading>

      <form @submit.prevent="sendForm">
        <LeInput
          label="*Tytuł:"
          id="title"
          placeholder="Czego szukasz?"
          class="mb-8"
          @onChange="changeTitle"
        />

        <LeTextarea
          label="*Opisz czego potrzebujesz:"
          id="content"
          placeholder="Opisz czego potrzebujesz."
          :rows="5"
          class="mb-2"
          @onChange="changeDescription"
        />
        <LeParagraph class="text-gray-500"> *Pola wymagane </LeParagraph>
        <div class="flex justify-around mb-8">
          <LeBtn variant="red" @click="closeForm">Anuluj</LeBtn>

          <LeBtn type="submit">Wyślij</LeBtn>
        </div>

        <LeExpertiseBox v-if="error">
          Wystąpił błąd, spróbuj ponownie później.
        </LeExpertiseBox>

        <LeErrorBox v-else-if="!isValid">
          Oba pola muszą być uzupełnione.
        </LeErrorBox>
      </form>
    </LeModal>

    <LePopup
      v-else
      closeOnBg
      closeBtn
      :isOpen="contactForm.isOpen"
      @onClose="closeForm"
    >
      <LeErrorBox v-if="sessionStore.isLogged && sessionStore.isCompany">
        Musisz zmienić konto na konto klienckie, aby móc nawiązać współpracę.
      </LeErrorBox>

      <LeErrorBox v-else-if="!sessionStore.isLogged">
        <LeHeading variant="h5" type="h3"> Musisz być zalogowany. </LeHeading>

        <LeBtnLink to="/logowanie" class="text-xl"> Zaloguj się </LeBtnLink>
      </LeErrorBox>
    </LePopup>
  </div>
</template>

<script setup lang="ts">
import { useContactForm } from "~/stores/contactForm";
const contactForm = useContactForm();

import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

import { useApiUrlStore } from "~/stores/api";
const apiUrl = useApiUrlStore().getApiUrl();

const title = ref("");
const description = ref("");
const isValid = ref(true);
const error = ref(false);

const changeTitle = (val: string): void => {
  title.value = val;
};

const changeDescription = (val: string): void => {
  description.value = val;
};

const validData = (): boolean => {
  if (!title.value || !description.value) return false;
  return true;
};

const resetData = (): void => {
  isValid.value = true;
  error.value = false;
};
const sendForm = async () => {
  resetData();

  if (!validData()) {
    isValid.value = false;
    return;
  }

  try {
    await fetch(`${apiUrl}/contract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          id: sessionStore.loggedId,
        },
        company: {
          id: contactForm.id,
        },
        title: title.value,
        description: description.value,
        gallery: null,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          error = true;
          console.error("Wystąpił błąd:");
        } else {
          closeForm();
        }
      })
      .catch((e) => {
        error = true;
        console.error("Wystąpił błąd:", e);
      });
  } catch (e) {
    error = true;
    console.error("Wystąpił błąd:", e);
  }
};

const closeForm = () => {
  contactForm.close();
};
</script>
