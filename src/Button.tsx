import React, { useState } from 'react'
import { Button, Spinner } from 'reactstrap'

import api from './service/api'

const ButtonUpdate: React.FC<{ setVisibleAlert: (value: boolean) => void }> = ({ setVisibleAlert }) => {
    const [loading, setLoading] = useState(false);

    async function handleUpdate(e: any) {
        e.preventDefault()

        setLoading(true)

        try {
            await api.post('/films/update', { update_all: 1 })
            setVisibleAlert(true)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setTimeout(() => { setVisibleAlert(false) }, 2000)
        }

    }

    return (
        <div>
            {loading ? <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner> :
                <Button
                    color="primary"
                    onClick={event => handleUpdate(event)}
                    outline
                >
                    Atualizar
                </Button>}
        </div>
    )
}

export default ButtonUpdate