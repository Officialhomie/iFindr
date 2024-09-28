import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID

export const client = createThirdwebClient({ clientId: clientId as string });
 