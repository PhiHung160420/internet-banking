import React from 'react';
import { useParams } from 'react-router-dom';

function DebtPaymentPage() {
    const params = useParams();
    console.log(params);
    return <div>DebtPaymentPage</div>;
}

export default DebtPaymentPage;
