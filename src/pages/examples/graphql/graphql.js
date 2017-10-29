import { template as _ } from 'lodash';
import { observable, action, autorun } from 'mobx';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

import { $ } from '~/utils';

import template from './graphql.html';
import style from './graphql.css';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://web-go-demo.herokuapp.com/__/graphql'
  })
});

export const store = observable({
  /**
   * @name observable
   */
  dataset: [],
  searchData: { text: '' },

  /**
   * @name action
   */
  searchItem: action(() => {
    client.query({
        query: gql`
          query List {
            list { _id text }
          }
        `
      })
      .then(({ data }) => {
        store.dataset = data['list'];
        store.searchData['text'] = '';
      });
  }),

  /**
   * @name computed
   */
   get total(): number {
     return store.dataset.length;
   }
});

export const render = (): void => {
  $('#app').innerHTML = _(template, { imports: { style } })({ store });

  $('#search-button').onclick = () => {
    store.searchItem();
  };
};

export default (parent: string): void =>
  page(`${parent}/graphql`, (): void => autorun(render));
