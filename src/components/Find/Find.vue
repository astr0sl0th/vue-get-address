<template>
  <div class="find">
    <label class="find__error">{{ errorMessage }}</label>
    <input
      type="text"
      class="find__postcode__input"
      v-model.trim="postcode"
      @keyup="getAddress"
      v-uppercase
      :placeholder="placeholder"
    />
    <ul v-if="addresses.length" class="find__list">
      <li
        v-for="(address, index) of addresses"
        :key="index"
        class="find__list__item"
        v-on:click="$emit('address-data', addressData)"
      >
        {{ address.replaceAll(',', ' ') }}
      </li>
    </ul>
  </div>
</template>

<style>
:root {
  /* Find root */
  --find-width: 400px;
  --find-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

  /* Error message  */
  --error-color: red;
  --error-font-size: 12px;

  /* Find input */
  --find-input-padding: 12px 20px;
  --find-input-border: solid 1px black;

  /* Find list */
  --find-list-height: 150px;

  /* Find list item */
  --find-item-border: solid 1px black;
  --find-item-padding: 5px;
}
.find {
  position: relative;
  width: var(--find-width);
  font-family: var(--find-font-family);
}
.find__postcode__input {
  position: relative;
  width: inherit;
  padding: var(--find-input-padding);
  overflow: hidden;
  display: block;
  border: var(--find-input-border);
}
.find__list {
  width: inherit;
  height: var(--find-list-height);
  overflow: scroll;
  display: block;
}
.find__list__item {
  padding: var(--find-item-padding);
  border-left: var(--find-item-border);
  border-right: var(--find-item-border);
  border-bottom: var(--find-item-border);
  cursor: pointer;
}
.find__error {
  position: absolute;
  top: 20px;
  right: 3px;
  z-index: 1;
  font-size: var(--error-font-size);
  color: var(--error-color);
}
</style>

<script>
import debounce from 'debounce';

export default {
  name: 'Find',
  data() {
    return {
      postcode: '',
      houseNumber: null,
      addresses: [],
      addressData: [],
      errorMessage: '',
    };
  },
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    format: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: Boolean,
      default: false,
    },
    fuzzy: {
      type: Boolean,
      default: Boolean,
    },
    placeholder: {
      type: String,
      default: 'Enter your postcode.',
    },
  },
  directives: {
    uppercase(el, binding) {
      let processedValue = el.value.toUpperCase();
      el.value = processedValue;
      binding.value = el.value;
    },
  },
  methods: {
    getAddress: debounce(async function() {
      const genericError = 'Server error, you should never see this.';
      if (this.postcode === '') {
        this.errorMessage = '';
        this.addresses = [];
        this.addressData = [];
        return;
      }
      try {
        const params = new URLSearchParams({
          format: this.format,
          sort: this.sort,
          expand: this.expand,
          fuzzy: this.fuzzy,
        }).toString();
        const request = await fetch(
          `https://api.getAddress.io/find/${this.postcode}?api-key=${this.apiKey}&${params}`
        );
        switch (request.status) {
          case 200: {
            const response = await request.json();
            this.errorMessage = '';
            this.addresses = response.addresses;
            this.addressData = response;
            return;
          }
          case 404: {
            if (this.postcode.length === '') return;
            this.errorMessage = 'No findes could be found for this postcode.';
            return;
          }
          case 400:
            this.errorMessage = 'Your postcode is not valid.';
            return;
          case 401:
            this.errorMessage = 'Your api-key is not valid.';
            return;
          case 403:
            this.errorMessage =
              'Your api-key is valid but you do not have permission to access to the resource.';
            return;
          case 429:
            this.errorMessage =
              'You have made more requests than your allowed limit.';
            return;
          case 500:
            this.errorMessage = genericError;
            return;
          default:
            this.errorMessage = genericError;
            return;
        }
      } catch (e) {
        console.log(e);
        this.errorMessage = genericError;
      }
    }, 300),
  },
};
</script>
