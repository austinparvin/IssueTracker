import React from 'react'

const NotFound = () => {
  return (
    <div>
      <h2>
        {Math.ceil(Math.random() * 100) % 2 === 0 ? (
          <span role="img" aria-label="guy raising questioning hands">
            🤷🏼‍♂️
          </span>
        ) : (
          <span role="img" aria-label="girl raising questioning hands">
            🤷‍♀️
          </span>
        )}
        &nbsp;Not sure how you got here. Do you want to{' '}
        <p onclick="window.history.go(-1); return false;">go back?</p>
      </h2>
    </div>
  )
}

export default NotFound
