import React from 'react'

const States = ({name, icon, value, type}) => {

    return (
        <div className="card">
            <h2>{name}</h2>
            <div className="card-content">
                {
                    {
                        '0': <i className={`${icon} ${value > 1000 ? 'icon-red' : 'icon-blue'}`} />,
                        '1': <i className={`${icon} ${value ? 'fas fa-angle-double-right fa-2x' : 'fas fa-times fa-2x'}`} />,
                        '2': <i className={`${icon} ${value ? 'far fa-lightbulb fa-2x' : 'fas fa-lightbulb fa-2x'}`} />
                    }[type]
                }
                {
                    {
                        '0': <p>{value}</p>,
                        '1': <p>{`${value ? 'flowing' : 'stopped'}`}</p>,
                        '2': <p>{`${value ? 'ON' : 'OFF'}`}</p>
                    }[type]
                }
                
            </div>
        </div>
    )
}

export default States
