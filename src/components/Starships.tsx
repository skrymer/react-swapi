import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

interface Props { }

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const Starships: React.FC<Props> = (props) => {
    const { loading, error, data } = useQuery<{rates: {currency: string, rate: string}[]}>(EXCHANGE_RATES);
    
    if (loading) return <p style={{ marginTop: '3em' }}>Loading...</p>;
    if (error) return <p style={{ marginTop: '3em' }}>Error :(</p>;

    return <div style={{ marginTop: '3em' }}>
        {data?.rates.map(({ currency, rate }) => (
        <div key={currency}>
            <p>
                {currency}: {rate}
            </p>
        </div>
    ))}
    </div>
};

export default Starships;