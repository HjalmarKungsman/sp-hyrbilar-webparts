import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
//import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, ISPHttpClientBatchOptions, ISPHttpClientBatchCreationOptions, SPHttpClientBatch } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

//import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';

import styles from './Hyrbilar.module.scss';
import * as strings from 'hyrbilarStrings';
import { IHyrbilarWebPartProps } from './IHyrbilarWebPartProps';

export default class HyrbilarWebPart extends BaseClientSideWebPart<IHyrbilarWebPartProps> {
  private listItemEntityTypeName: string = undefined;

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl10 ms-u-xlPush1 ms-u-lgPush1">
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <div>
                <div>
                  <button class="${styles.button} createList-Button">
                    <span class="${styles.label}">Create list</span>
                  </button>
                  <button class="${styles.button} createField2-Button">
                    <span class="${styles.label}">Create field (Title2)</span>
                  </button>
                  <button class="${styles.button} createField3-Button">
                    <span class="${styles.label}">Create field (pris)</span>
                  </button>
                </div>
                <div>
                  <button class="${styles.button} createView-Button">
                    <span class="${styles.label}">Create view</span>
                  </button>
                  <button class="${styles.button} createViewField2-Button">
                    <span class="${styles.label}">Add field to view (Title2)</span>
                  </button>
                  <button class="${styles.button} createViewField3-Button">
                    <span class="${styles.label}">Add field to view (Pris)</span>
                  </button>
                </div>
                <div>
                  <button class="${styles.button} getViews-Button">
                    <span class="${styles.label}">Get views</span>
                  </button>
                </div>
                <div>
                  <button class="${styles.button} createItem-Button">
                    <span class="${styles.label}">Create item</span>
                  </button>
                  <button class="${styles.button} getListItems-Button">
                    <span class="${styles.label}">Get items</span>
                  </button>
                </div>
                <div>
                  <button class="${styles.button} createListAndFields-Button">
                    <span class="${styles.label}">Create list and fields</span>
                  </button>
                <div>
                <div>
                  <button class="${styles.button} clearUL-Button">
                    <span class="${styles.label}">Clear</span>
                  </button>
                </div>
              </div>
              <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
                <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                  <div class="status"></div>
                  <ul class="items"><ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

      this.listItemEntityTypeName = undefined;
      this.setButtonsEventHandlers();
  }

  private setButtonsEventHandlers(): void {
    const webPart: HyrbilarWebPart = this;
    this.domElement.querySelector('button.clearUL-Button').addEventListener('click', () => { webPart.clearUL(); });
    this.domElement.querySelector('button.createList-Button').addEventListener('click', () => { webPart.createList(); });
    this.domElement.querySelector('button.createField2-Button').addEventListener('click', () => { webPart.createField('Title2', 2, true, 'Title2'); });
    this.domElement.querySelector('button.createField3-Button').addEventListener('click', () => { webPart.createField('Pris', 9, true, 'Pris'); });
    this.domElement.querySelector('button.createView-Button').addEventListener('click', () => { webPart.createView('Hyrbil View 2'); });
    this.domElement.querySelector('button.createViewField2-Button').addEventListener('click', () => { webPart.createViewField('Title2'); });
    this.domElement.querySelector('button.createViewField3-Button').addEventListener('click', () => { webPart.createViewField('Pris'); });
    this.domElement.querySelector('button.getViews-Button').addEventListener('click', () => { webPart.getViews(); });
    this.domElement.querySelector('button.createItem-Button').addEventListener('click', () => { webPart.createItem(); });
    this.domElement.querySelector('button.getListItems-Button').addEventListener('click', () => { webPart.getListItems(); });
    this.domElement.querySelector('button.createListAndFields-Button').addEventListener('click', () => { webPart.createListAndFields(); });
    
  }

  public listGuid = '';
  public viewGuid = '';

  private currentTime() {
    var currentdate = new Date();
    var currentTime: string = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return currentTime;
  }

  private createList(): void {
    this.updateStatus('Creating list...');
    const spOpts: ISPHttpClientOptions = {
      body: `{ Title: 'Hyrbilar Lista ${this.currentTime()}', BaseTemplate: 100 }`
    };

    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists`, SPHttpClient.configurations.v1, spOpts)
      .then((response: SPHttpClientResponse) => {
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);
        response.json().then((responseJSON: JSON) => {
          this.updateStatus('List "' + responseJSON['Title'] + '" created...');
          this.listGuid = responseJSON['Id'];
        });
      });
  }

  private createField(fieldTitle, fieldTypeKind, fieldRequired, fieldStaticName): void {
    const sp1pts: ISPHttpClientOptions = {
      body: `{  'Title': '${fieldTitle}', 
                'FieldTypeKind': ${fieldTypeKind},
                'Required': '${fieldRequired}', 
                'EnforceUniqueValues': 'False',
                'StaticName': '${fieldStaticName}' 
              }`
    };
    this.updateStatus('Creating field...');
    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.listGuid}')/Fields`, SPHttpClient.configurations.v1, sp1pts)
      .then((response: SPHttpClientResponse) => {
        
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);
        
        response.json().then((responseJSON: JSON) => {
          this.updateStatus('Field "' + responseJSON['Title'] + '" created...');
        });
      });
      
  }

  private createView(viewTitle): void {
    this.updateStatus('Creating view...');
    //const query = '<Query></Query><RowLimit>34</RowLimit>';

    const body: string = JSON.stringify({
      '__metadata': {
        'type': `SP.View`
      },
      'Title': `${viewTitle} ${this.currentTime()}`,
      // 'PersonalView': false,
      // 'ViewQuery': `${query}`,
      'DefaultView': false
    });
    
    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')/views`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        },
        body: body
      })
      .then((response: SPHttpClientResponse) => {

        console.log(`Status code & text: ${response.status}, ${response.statusText}`);
        
        response.json().then((responseJSON: JSON) => {
          this.updateStatus('View "' + responseJSON['Title'] + '" created...');
          this.viewGuid = responseJSON['Id'];
        });
      });
  }

  private createViewField(fieldTitle): void {
    this.updateStatus('Adding field to view...');
    const body: string = JSON.stringify({
      'strField': `${fieldTitle}`
    });
    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')/views('${this.viewGuid}')/ViewFields/AddViewField`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        },
        body: body
      })
      .then((response: SPHttpClientResponse) => {
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);
        response.json().then((responseJSON: JSON) => {
          this.updateStatus('Field "' + responseJSON['Title'] + '" added to view...');
        });
      });
  }

  private createItem(): void {
    this.updateStatus('Creating item...');
    this.getListItemEntityTypeName()
      .then((listItemEntityTypeName: string): Promise<SPHttpClientResponse> => {
        const time = this.currentTime;
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': `Volvo ${this.currentTime()}`,
          'Title2': `V60`,
          'Pris': `12345`
        });
        return this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': ''
            },
            body: body
          });
      })
      .then((response: SPHttpClientResponse) => {
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);
      })
      .then((item): void => {
        this.updateStatus(`Item created...`);
      }, (error: any): void => {
        this.updateStatus('Error while creating the item: ' + error);
      });
  }

  private getListItems(): void {
    this.updateStatus('Getting list items...');
    this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse) => {
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);

        this.updateStatus('List items recived: ');
        response.json().then((responseJSON: JSON) => {

          var items = responseJSON['value'];
          const itemsHtml: string[] = [];
          
          for (let i: number = 0; i < items.length; i++) {
            itemsHtml.push(`<li>${items[i].Title}, ${items[i].Title2}, ${items[i].Pris}</li>`);
          }

          this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
        });
      });
  }

  private getViews(): void {
    this.updateStatus('Getting list views...');
    this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')/views`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse) => {
        console.log(`Status code & text: ${response.status}, ${response.statusText}`);

        this.updateStatus('List views recived: ');
        response.json().then((responseJSON: JSON) => {

          var items = responseJSON['value'];
          const itemsHtml: string[] = [];
          
          for (let i: number = 0; i < items.length; i++) {
            itemsHtml.push(`<li>${items[i].Title}</li>`);
          }

          this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
        });
      });
  }

  private getListItemEntityTypeName(): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      if (this.listItemEntityTypeName) {
        resolve(this.listItemEntityTypeName);
        return;
      }

      this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${this.listGuid}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
          resolve(this.listItemEntityTypeName);
        });
    });
  }

  private createListAndFields() {
    const listName = 'Hyrbilar Lista ' + this.currentTime();
    let listGuid = '';
    this.createList2(listName)
    .then((response: string) => {
      listGuid = response;
      this.createField2(listGuid,'Title2', 2, true, 'Title2')
      .then((response: string) => {
        this.createField2(listGuid,'Pris', 9, true, 'Pris');
      })
    });
  }

  private createList2(listName: string): Promise<string> {
    return new Promise<string>((resolve: (listGuid: string) => void, reject: (error: any) => void): void => {
      const spOpts: ISPHttpClientOptions = {
        body: `{ Title: '${listName}', BaseTemplate: 100 }`
      };
      this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists`, SPHttpClient.configurations.v1, spOpts)
        .then((response: SPHttpClientResponse) => {
          console.log(`Status code & text: ${response.status}, ${response.statusText}`);
          response.json().then((responseJSON: JSON) => {
            this.updateStatus('List "' + responseJSON['Title'] + '" created...');
            resolve(responseJSON['Id']);
          });
        }, (error: any): void => {
          this.updateStatus('Error while creating the list: ' + error);
          reject(error);
        });
    });
  }


  private createField2 = function(listGuid: string, fieldTitle: string, fieldTypeKind: number, fieldRequired: boolean, fieldStaticName: string): Promise<string> {
    this.updateStatus('Creating field...');
    return new Promise<string>((resolve: (listGuid: string) => void, reject: (error: any) => void): void => {
      const sp1pts: ISPHttpClientOptions = {
        body: `{  'Title': '${fieldTitle}', 
                  'FieldTypeKind': ${fieldTypeKind},
                  'Required': '${fieldRequired}', 
                  'EnforceUniqueValues': 'False',
                  'StaticName': '${fieldStaticName}' 
                }`
      };
      this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${listGuid}')/Fields`, SPHttpClient.configurations.v1, sp1pts)
        .then((response: SPHttpClientResponse) => {
          console.log(`Status code & text: ${response.status}, ${response.statusText}`);
          response.json().then((responseJSON: JSON) => {
            this.updateStatus('Field "' + responseJSON['Title'] + '" created...');
            resolve(responseJSON['Title']);
          });
        }, (error: any): void => {
          this.updateStatus('Error while creating the field: ' + error);
          reject(error);
        });
    });
  }


  
  private clearUL(): void {
    this.updateStatus('Clearing...');
    this.domElement.querySelector('.items').innerHTML = '';
  }

  private updateStatus(status: string): void {
    this.domElement.querySelector('.status').innerHTML = status;
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
