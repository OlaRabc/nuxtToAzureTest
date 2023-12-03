<template>
  <Container class="!max-w-full bg-black text-indigo-50">
    <Row class="justify-between items-stretch">
      <Col :col="2" class="my-auto">
        <LeLogo />
      </Col>
      <Col :col="10" class="flex justify-end">
        <slot />
      </Col>
    </Row>
  </Container>
</template>
