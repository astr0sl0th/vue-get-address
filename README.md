# vue-get-address

getAddress() allows you to lookup an address via a U.K postcode which is useful if you need to prepopulate address fields on your site.

## Support

- [Find](https://getaddress.io/Documentation#addresses) ✅
- [Autocomplete](https://getaddress.io/Documentation#addresses) 🔧
- [Typeahead](https://getaddress.io/Documentation#addresses) 🔧
- [Distance](https://getaddress.io/Documentation#addresses) 🔧

## Find

### Props

| Name               | Default              | Options                  | Required | Type    |
| ------------------ | -------------------- | ------------------------ | -------- | ------- |
| apiKey             | ''                   | Your getAddress() key    | Yes      | string  |
| expand             | false                | true/false               | No       | boolean |
| lookupType         | postcode             | poscode, withHouseNumber | No       | string  |
| placeholder        | Enter your postcode. | N/A                      | No       | string  |
| @address-as-string | Full address         | function                 | No       | emitter |

#### Example

```html
<Find :apiKey="'{your-key-here}'" />
```
