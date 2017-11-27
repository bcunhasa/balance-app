import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EditorPage } from '../editor/editor';
import { GalleryPage } from '../gallery/gallery';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EditorPage;
  tab3Root = GalleryPage;
  tab4Root = SettingsPage;

  constructor() {
  }
}
