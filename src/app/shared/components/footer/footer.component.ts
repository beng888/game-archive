import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    public socials = [
        { img: 'facebook', link: 'https://www.facebook.com/garamboody/' },
        { img: 'github', link: 'https://github.com/beng888' },
        {
            img: 'linkedin',
            link: 'https://www.linkedin.com/in/lawrence-jason-ardosa-470250176/',
        },
    ];

    ngOnInit(): void {}
    constructor() {}
}
