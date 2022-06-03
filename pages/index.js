import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from '../routes';


class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
  /* #dda53e orangy */
      return {
        header: <h3 style={{color: "#F9E9D1"}}>{address}</h3>,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a style={{color: "orange"}}>View Campaign</a>
          </Link>
        ),
        fluid: true,
        style: { backgroundColor: '#1b1c1d'}, color: "orange"
      };
      
    });
   
    return <Card.Group items={items}/>;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3 style={{color: "#F9E9D1"}}>Open Campaigns on Rinkeby Testnet</h3>
        
          <Link route="/campaigns/new">
            <a >
              <Button inverted color="orange" floated="right" content="Create Campaign" icon="add"/>
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
