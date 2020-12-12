import { Container } from 'typedi';
import LoggerInstance from './logger';
import config from '../config';
import mailgun from 'mailgun-js';

export default () => {
  try {
    
    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
