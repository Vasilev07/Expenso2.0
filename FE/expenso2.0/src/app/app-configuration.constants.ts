import { InjectionToken } from '@angular/core';

export const CONFIGURATION: InjectionToken<any> = new InjectionToken('Config');
export const BASE_PATH = new InjectionToken<string>('basePath');
