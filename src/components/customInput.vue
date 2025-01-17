<template>
  <div class="wrapper">
    <input
      :id="name"
      :class="{ field_error: errorMessage, valid: meta.valid }"
      class="input"
      v-model="value"
      :placeholder="placeholder"
      :type="type || 'text'"
      :maxlength="maxlength || 200"
    />

    <small :class="errorMessage ? 'error_message' : ''">{{
      errorMessage
    }}</small>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: String,
  placeholder: String,
  maxlength: Number,
});

const { value, errorMessage, meta } = useField(() => props.name);
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.field_error {
  border: 1px solid red !important;
}

.error_message {
  color: red;
  margin-left: 10px;
}
</style>
