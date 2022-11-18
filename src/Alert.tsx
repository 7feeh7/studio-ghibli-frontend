import React from 'react'
import { Alert } from 'reactstrap'

const AlertUpdate: React.FC<{ visibleAlert: boolean }> = ({ visibleAlert }) => {
    return (
        <div>
            <Alert isOpen={visibleAlert} variant="success" dismissible>
                Base atualizada
            </Alert>
        </div>
    )
}

export default AlertUpdate