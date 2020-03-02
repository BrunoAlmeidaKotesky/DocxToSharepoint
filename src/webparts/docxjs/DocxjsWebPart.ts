import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'DocxjsWebPartStrings';
import TemplateGen from './components/DocxContext';
import { IDocxjsProps } from './components/IDocxjsProps';
import { PageContext } from '@microsoft/sp-page-context';
import { sp } from "@pnp/sp";

export interface IDocxjsWebPartProps {
  description: string;
  pageCtx: PageContext;
}

export default class DocxjsWebPart extends BaseClientSideWebPart<IDocxjsWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {

    const element: React.ReactElement<IDocxjsProps> = React.createElement(
      TemplateGen,
      {
        description: this.properties.description,
        pageCtx: this.properties.pageCtx
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
