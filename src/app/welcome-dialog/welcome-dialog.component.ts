import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { app } from '@electron/remote';

import { Analytics } from '../../../src-shared/analytics/analytics';
import { Logger } from '../../../src-shared/log/logger';
import { openUrl } from '../../../src-shared/url/open-url';
import { IconDataUrl } from '../../assets/icon-data-url';
import { configureOpeningInOsBrowser } from '../shared/open-url/configure-opening-in-os-browser';
import { WelcomeDialogAtAppLaunchService } from './welcome-dialog-at-app-launch/welcome-dialog-at-app-launch.service';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent implements AfterViewInit {
  public readonly appVersion = app.getVersion();

  @ViewChild('troubleshootingPageLink') public troubleshootingPageLink: ElementRef<HTMLAnchorElement>;

  public get twitterLogoDataUrl() { return this.sanitizer.bypassSecurityTrustResourceUrl(IconDataUrl.twitterLogo); }
  public get gitHubLogoDataUrl() { return this.sanitizer.bypassSecurityTrustResourceUrl(IconDataUrl.gitHubLogo); }

  constructor(private sanitizer: DomSanitizer,
              private welcomeDialogAtAppLaunchService: WelcomeDialogAtAppLaunchService) {
  }

  public ngAfterViewInit() {
    configureOpeningInOsBrowser(this.troubleshootingPageLink, 'https://github.com/thedabworthyglitch/exif-map-visualizer/blob/main/docs/troubleshooting/troubleshooting.md',
                                'Troubleshooting Page', 'Welcome Dialog');
  }

  public handleTwitterProfileIconClicked() {
    openUrl('https://twitter.com/utkarshisdead', 'Twitter Profile of Utkarsh Parashar', 'Welcome Dialog');
  }

  public handleGitHubProfileIconClicked() {
    openUrl('https://github.com/thedabworthyglitch', 'GitHub Profile of Utkarsh Parashar', 'Welcome Dialog');
  }

  public onOkClicked() {
    Logger.info(`[Welcome Dialog] Clicked OK button`);
    Analytics.trackEvent(`Welcome Dialog`, '[Welcome Dialog] Clicked OK button');
    this.welcomeDialogAtAppLaunchService.saveThatUserClickedOk();
  }
}
