import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SpToDocxWebPartStrings';
import DocumentCreator from './components/Context';
import { ISpToDocxProps } from './components/ISpToDocxProps';
import { PageContext } from '@microsoft/sp-page-context';
import { sp } from "@pnp/sp";

export interface ISpToDocxWebPartProps {
  description: string;
  pageCtx: PageContext;
}

export default class SpToDocxWebPart extends BaseClientSideWebPart<ISpToDocxWebPartProps> {
  
  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
  }
  
  public render(): void {
    const element: React.ReactElement<ISpToDocxProps > = React.createElement(
      DocumentCreator,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
