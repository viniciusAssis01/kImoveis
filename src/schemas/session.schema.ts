import { z } from 'zod';
import { userSchema } from './user.schema';

export const sessionSchema = userSchema.pick({email: true, password: true});
//console.log(sessionSchema)

/* estamos usando um schema dentro de outro schema (referenciando outro schema) e estamos usando o método pick().
  esse método recebe como parametro um objeto cujas chaves/propriedades serão as propriedaes do schema declarado (antes desse método) q queremos manter/passar/copiar para esse schema atual.

    é a msm coisa q escrever o seguinte:
    export const sessionCreate = z.object({
      email: z.string().max(50).email().nonempty(),
      password: z.string().max(120).nonempty(),
    });

    //esse schema é para descrever como os dados de entrada da requisiçaõ deve vir para conseguir fazer o login
*/

