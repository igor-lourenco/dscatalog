import { hasAnyRoles } from '../auth';
import * as TokenModule from '../token';

describe('hasAnyRole tests', () => {
  test('should return true when empty list', () => {
    const result = hasAnyRoles([]);
    expect(result).toEqual(true);
  });

  test('should return true when user has given role', () => {
    jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
      //faz uma simulação do retorno da função do  getTokenData, dados mockado
      exp: 0,
      user_name: '',
      authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
    });

    const result = hasAnyRoles(['ROLE_ADMIN']);
    expect(result).toEqual(true);
  });
  test('should return false when user does not have given role', () => {
    jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
      //faz uma simulação do retorno da função do  getTokenData, dados mockado
      exp: 0,
      user_name: '',
      authorities: ['ROLE_OPERATOR'],
    });

    const result = hasAnyRoles(['ROLE_ADMIN']);
    expect(result).toEqual(false);
  });
});
