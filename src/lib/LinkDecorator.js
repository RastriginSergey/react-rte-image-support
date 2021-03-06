/* @flow */
import React from 'react';
import {Entity} from 'draft-js';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock} from 'draft-js';

// TODO: Use a more specific type here.
type ReactNode = any;

const FIELD_REGEX = /^\w+( \w+)*$/g;


type Props = {
  children: ReactNode,
  entityKey: string,
};

type EntityRangeCallback = (start: number, end: number) => void;

function Link(props_: Props) {
  const {url} = Entity.get(props_.entityKey).getData();
  return (
    <a className='link' href={url}>{props_.children}</a>
  );
}

function findLinkEntities(contentBlock: ContentBlock, callback: EntityRangeCallback) {
  const text = contentBlock.getText();
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === ENTITY_TYPE.LINK
    );
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
