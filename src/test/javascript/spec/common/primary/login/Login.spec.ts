import { mount } from '@vue/test-utils';
import Login from '@/common/primary/login/Login.vue';

test('Login', () => {
  // restitue le composant
  const wrapper = mount(Login);

  // n'accepte pas un `username` de moins de 7 caractères, exclut les espaces
  wrapper.setData({ username: ' '.repeat(7) });

  // vérifie que `error` est restituée
  expect(wrapper.find('.error').exists()).toBe(true);

  // met à jour `username` afin qu'il soit suffisamment long
  wrapper.setData({ username: 'Lachlan' });

  // vérifie que `error` n'est plus restituée
  expect(wrapper.find('.error').exists()).toBe(false);
});
