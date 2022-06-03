import { Main } from 'next/document';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu inverted style={{ marginTop: '10px'}}>
      <Link route="/">
       
        <a style={{color: "orange"}} className="item">Crowfund</a>
      </Link> 

      <Menu.Menu position="right">
        <Link route="/">
          <a style={{color: "orange"}} className="item">Campaigns</a>
        </Link>
        
        <Link route="/campaigns/new">
          <a style={{color: "orange"}} className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};