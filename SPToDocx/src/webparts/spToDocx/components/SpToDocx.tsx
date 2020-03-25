import * as React from 'react';
import styles from './SpToDocx.module.scss';
import { ISpToDocxProps } from './ISpToDocxProps';

export default function SpToDocx(props:ISpToDocxProps) {

    return (
      <div className={ styles.spToDocx }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}
