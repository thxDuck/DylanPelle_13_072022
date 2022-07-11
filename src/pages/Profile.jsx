import React from 'react'
import HeaderProfile from "../components/profile/HeaderProfile.jsx";
import AccountResume from "../components/profile/AccountResume.jsx";

const mockedAccounts = [
    {
        "id": 1,
        "title": "Argent Bank Checking (x8349)",
        "amount": "$2,082.79",
        "amountDescription": "Available Balance"
    },
    {
        "id": 2,
        "title": "Argent Bank Savings (x6712)",
        "amount": "$10,928.42",
        "amountDescription": "Available Balance"
    },
    {
        "id": 3,
        "title": "Argent Bank Credit Card (x8349)",
        "amount": "$184.30",
        "amountDescription": "Current Balance"
    },
]

const Profile = () => {
    return (
        <main className="main bg-dark">
            <HeaderProfile />
            <h2 className="sr-only">Accounts</h2>
            {mockedAccounts.map(acc => {
                return <AccountResume key={acc.id} title={acc.title}
                    amount={acc.amount}
                    amountDescription={acc.amountDescription} />
            })}
        </main>
    )
}

export default Profile