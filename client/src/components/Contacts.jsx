import '../styles/contacts.css'

export default function Contacts({ contacts, dispatch }) {
    const addNewContact = () => {

    }
    return (
        <aside className="contacts">
            <h1>Contacts</h1>
            <>
                {
                    contacts.map((contact, i) => {
                        return (
                            <Contact {...contact} key={i + contact.id + i} />
                        )
                    })
                }
                <button onClick={addNewContact}>
                    Add new
                </button>
            </>
        </aside>
    )
}


function Contact({ name, email }) {
    return (
        <article className="contact" aria-label={name}>
            <div className="icon">{ name.substring(0, 1).toUpperCase() }</div>
            <div className="details">
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </article>
    )
}