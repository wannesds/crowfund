import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    //result is an object!
    
    return { 
      address: props.query.address,
      title: summary[0],
      minimumContribution: summary[1],
      balance: summary[2],
      requestsCount: summary[3],
      approversCount: summary[4],
      manager: summary[5]
     };
  }
  

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      title
    } = this.props;
    console.log(this.props)

    const items = [
      {
        header: title,
        meta: 'Campaign Title',
        description: 'Information about the campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can make spend requests.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'Minimum amount to be able to become a contributor.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request withdraws money from the campaign if enough contributors approve it.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of contributors who donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'Amount of money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>  
                </a>  
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;