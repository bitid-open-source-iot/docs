import { environment } from 'src/environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scopes'
})

export class ScopesPipe implements PipeTransform {

    transform(scopes: number[]): string {
        let result: string[] = [];
        scopes.map(scope => {
            environment.roles.map(role => {
                if (role.value == scope) {
                    result.push(role.description);
                };
            });
        });

        return result.join(", ");
    };

}