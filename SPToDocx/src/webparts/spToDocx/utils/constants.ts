import { IDatePickerStrings } from 'office-ui-fabric-react';
export const DayPicker: IDatePickerStrings = {
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], 
    goToToday: 'Ir para hoje', 
    prevMonthAriaLabel: 'Próximo Mês',
    nextMonthAriaLabel: 'Mês Anterior',
    prevYearAriaLabel: 'Ano Anterior',
    nextYearAriaLabel: 'Próximo Ano',
    closeButtonAriaLabel: 'Fechar',
};
export const formatDate = (date:Date) =>('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();

export const getFieldFormat = (xml:string, attr:string) => {
    let parser = new DOMParser();
    let xmlObj = parser.parseFromString(xml, 'text/xml');
    let formatType = xmlObj.getElementsByTagName('Field')[0].getAttribute(attr);
    return formatType;
};