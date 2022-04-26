import { assignNewMochaID } from 'mocha/lib/utils';
import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    //result is an object!
    return { 
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
     };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
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
          <Grid.Column width={10}>
            {this.renderCards()}
          </Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;