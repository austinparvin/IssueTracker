import React from 'react'
import { Button, Spinner } from 'reactstrap'

const LoadingSpinner = () => {
  return (
    <section className="loadingSpinner">
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        &nbsp;Loading...
      </Button>
    </section>
  )
}

export default LoadingSpinner
