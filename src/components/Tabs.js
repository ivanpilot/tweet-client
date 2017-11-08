import React from 'react';

export const Tabs = (props) => (
  <div className="ui tabular menu">
    {
      props.tabs.map((tab, index) => {
        return (
          <a
            key={index}
            className={tab.active? 'active item' : 'item'}
            onClick={() => props.handleClickTab(tab.id, props.activeThreadId)}
          >
            {tab.name}
          </a>
        )
      })
    }
  </div>
)
