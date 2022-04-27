import { defineComponent, inject, ref } from 'vue';
import { ConnectionService } from '@/common/domain/ConnectionService';
import { UserCredentialsDTO } from '@/common/domain/User';
import { jwtStore } from '@/common/domain/StoreService';

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    const connectionService = inject('connectionService') as ConnectionService;

    const store = jwtStore();

    const form = ref<UserCredentialsDTO>({
      username: '',
      password: '',
      rememberMe: false,
    });

    let error = false;

    const onSubmit = async (): Promise<void> => {
      await connectionService
        .login(form.value)
        .then(id => {
          store.setToken(id);
        })
        .catch(e => {
          error = true;
        });
    };

    const getError = (): boolean => {
      return error;
    };

    return {
      onSubmit,
      form,
      getError,
    };
  },
});
