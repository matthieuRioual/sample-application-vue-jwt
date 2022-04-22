export default {
  name: 'Login',
  data: () => {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: () => {
    return {
      // @ts-ignore
      onSubmit(e) {
        e.preventDefault();
      },
    };
  },
};
