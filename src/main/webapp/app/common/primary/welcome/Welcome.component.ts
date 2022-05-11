import { defineComponent, inject, ref } from 'vue';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { Logger } from '@/common/domain/Logger';
import { User } from '@/common/domain/User';

export default defineComponent({
  name: 'Welcome',
  components: {},
  setup() {
    const authenticationService = inject('authenticationService') as AuthenticationService;
    const logger = inject('logger') as Logger;

    let user = ref<User>({
      username: '',
      authorities: [''],
    });

    const onClick = async (): Promise<void> => {
      await authenticationService
        .authenticate()
        .then(response => {
          user.value = response;
        })
        .catch(error => {
          logger.error('The token provided is not know by our service', error);
        });
    };

    return {
      onClick,
      user,
    };
  },
});
