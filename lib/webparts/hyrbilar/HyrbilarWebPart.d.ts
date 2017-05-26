import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IHyrbilarWebPartProps } from './IHyrbilarWebPartProps';
export default class HyrbilarWebPart extends BaseClientSideWebPart<IHyrbilarWebPartProps> {
    private listItemEntityTypeName;
    render(): void;
    private setButtonsEventHandlers();
    listGuid: string;
    viewGuid: string;
    private currentTime();
    private createList();
    private createField(fieldTitle, fieldTypeKind, fieldRequired, fieldStaticName);
    private createView(viewTitle);
    private createViewField(fieldTitle);
    private createItem();
    private getListItems();
    private getViews();
    private getView();
    private getViewField();
    private getListItemEntityTypeName();
    private createListAndFields();
    private createList2(listName);
    private createField2;
    private clearUL();
    private updateStatus(status);
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
