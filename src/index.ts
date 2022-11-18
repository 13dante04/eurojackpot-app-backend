import { getResults } from "./eurojackpot-results";
const EUROJACKPOT_RESULT_SITE = 'https://www.eurojackpot.org/en/results';

async function main() {
    let result = await getResults();
    console.log('Latest eurojackpot results were: ', result);
}

main()
.then(() => console.log('Done'))
.catch((error) => console.error(error));