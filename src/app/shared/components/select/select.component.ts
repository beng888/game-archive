import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
    @Input() placeHolder: string = '';
    @Input() options!: any;
    @Input() label_1!: string[];
    @Input() select_1!: string[];
    @Input() options2?: string = '';
    @Input() label_2?: string[] = [''];
    @Input() select_2?: string[] = [''];
    @Output() selectFilter = new EventEmitter<{ key: string; value: string }>();

    selecting: boolean = false;
    selected: string | null = null;

    getLabel = (option: any, labels: string[]) =>
        labels.map((l) => option[l]).join(' - ');

    onSelect(key: string, value: string, value2: string) {
        if (value === '' && value2 === '') this.selected = null;
        if (key === 'dates' && value !== '') {
            const val = `${value}-01-01,${value2}-12-31`;
            return this.selectFilter.emit({ key, value: val });
        }

        this.selectFilter.emit({ key, value });
    }

    ngOnInit(): void {
        /* ------------------------ GET SELECTED BASED ON URL ----------------------- */
        this.route.queryParams.subscribe((S) => {
            if (
                (this.select_2 && Object.keys(S).includes(this.select_2[0])) ||
                Object.keys(S).includes(this.select_1[0])
            ) {
                const Q =
                    (this.select_2 && S[this.select_2[0]]) ||
                    S[this.select_1[0]];

                const All = [
                    ...this.options,
                    ...this.options.reduce((a: any, o: any) => {
                        if (this.options2)
                            return a.concat(o[this.options2 || '']);
                        return a;
                    }, []),
                ];

                const years = Q.replace(',', '-')
                    .split('-')
                    .filter((f: string) => f.length >= 4);
                const year =
                    years[0] === years[1] ? years[0] : years.join(' - ');

                const match = All.find(
                    (f) =>
                        String(f[this.select_1[1]]) === Q ||
                        String(f[this.select_1[2]]) === Q
                );

                this.selected =
                    this.select_1[0] === 'dates' ? year : match?.['name'];
            }
        });
    }
    constructor(private route: ActivatedRoute) {}
}
