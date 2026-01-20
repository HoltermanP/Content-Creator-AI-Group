export interface TemplateVariables {
  [key: string]: string | number | boolean;
}

export class TemplateProcessor {
  /**
   * Process a template by replacing variables with actual values
   * Variables in template should be in format: {{variableName}} or {{variableName:defaultValue}}
   */
  static processTemplate(template: string, variables: TemplateVariables): string {
    let processed = template;

    // Find all variable placeholders in the template
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = template.match(variableRegex);

    if (!matches) {
      return template;
    }

    // Replace each variable
    matches.forEach(match => {
      const variableContent = match.slice(2, -2); // Remove {{ }}
      const [varName, defaultValue] = variableContent.split(':');

      const value = variables[varName.trim()];

      if (value !== undefined && value !== null) {
        // Use the provided value
        processed = processed.replace(match, String(value));
      } else if (defaultValue) {
        // Use the default value
        processed = processed.replace(match, defaultValue.trim());
      } else {
        // Variable not found and no default - leave placeholder
        console.warn(`Template variable '${varName}' not found and no default provided`);
      }
    });

    return processed;
  }

  /**
   * Extract all variable names from a template
   */
  static extractVariables(template: string): string[] {
    const variableRegex = /\{\{([^:}]+)[:}]*/g;
    const matches = template.match(variableRegex);

    if (!matches) {
      return [];
    }

    return matches.map(match => {
      const variableContent = match.slice(2, -2); // Remove {{ }}
      return variableContent.split(':')[0].trim();
    }).filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  }

  /**
   * Validate that all required variables are provided
   */
  static validateVariables(template: string, variables: TemplateVariables): {
    valid: boolean;
    missing: string[];
    provided: string[];
  } {
    const requiredVars = this.extractVariables(template);
    const providedVars = Object.keys(variables);

    const missing = requiredVars.filter(v => !providedVars.includes(v) && !template.includes(`{{${v}:`));
    const provided = providedVars.filter(v => requiredVars.includes(v));

    return {
      valid: missing.length === 0,
      missing,
      provided
    };
  }

  /**
   * Get default values from template variables
   */
  static getDefaultValues(template: string): TemplateVariables {
    const defaults: TemplateVariables = {};
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = template.match(variableRegex);

    if (!matches) {
      return defaults;
    }

    matches.forEach(match => {
      const variableContent = match.slice(2, -2); // Remove {{ }}
      const [varName, defaultValue] = variableContent.split(':');

      if (defaultValue) {
        const trimmedVarName = varName.trim();
        const trimmedDefault = defaultValue.trim();

        // Try to parse as number or boolean, otherwise keep as string
        if (trimmedDefault === 'true') {
          defaults[trimmedVarName] = true;
        } else if (trimmedDefault === 'false') {
          defaults[trimmedVarName] = false;
        } else if (!isNaN(Number(trimmedDefault))) {
          defaults[trimmedVarName] = Number(trimmedDefault);
        } else {
          defaults[trimmedVarName] = trimmedDefault;
        }
      }
    });

    return defaults;
  }

  /**
   * Create a sample template with common variables for LinkedIn content
   */
  static createSampleTemplate(type: 'storyline' | 'tips' | 'announcement' | 'celebration'): {
    name: string;
    content: string;
    variables: TemplateVariables;
  } {
    switch (type) {
      case 'storyline':
        return {
          name: 'Storyline Serie Template',
          content: `Dag {{dagnummer}} van onze '{{serie_naam}}' serie! 🚀

{{inhoud}}

{{vraag_voor_volgende}}

#{{hashtag1}} #{{hashtag2}} #{{hashtag3}}

Wat vind jij hiervan? Laat het weten in de comments! 👇`,
          variables: {
            dagnummer: 1,
            serie_naam: 'Digital Transformation Journey',
            inhoud: 'Vandaag bespreken we de eerste stap...',
            vraag_voor_volgende: 'Welke uitdaging zie jij als eerste stap?',
            hashtag1: 'DigitalTransformation',
            hashtag2: 'BusinessGrowth',
            hashtag3: 'Innovation'
          }
        };

      case 'tips':
        return {
          name: 'Tips & Advies Template',
          content: `💡 Tip {{tip_nummer}}: {{tip_onderwerp}}

{{tip_inhoud}}

Deze aanpak heeft bij {{voorbeeld_bedrijf}} geleid tot {{resultaat}}.

Welke tips heb jij voor {{doelgroep}}? Deel ze hieronder! 👇

#{{hashtag1}} #{{hashtag2}}`,
          variables: {
            tip_nummer: 1,
            tip_onderwerp: 'LinkedIn Optimalisatie',
            tip_inhoud: 'Consistent posten is cruciaal voor zichtbaarheid...',
            voorbeeld_bedrijf: 'onze klanten',
            resultaat: '30% meer engagement',
            doelgroep: 'ondernemers',
            hashtag1: 'Tips',
            hashtag2: 'LinkedIn'
          }
        };

      case 'announcement':
        return {
          name: 'Aankondiging Template',
          content: `🚨 Grote aankondiging! 

We zijn verheugd om {{nieuwe_feature}} te introduceren! 🎉

{{feature_beschrijving}}

🌟 Wat maakt dit bijzonder:
{{voordelen}}

Beschikbaar vanaf {{beschikbaar_datum}} voor {{doelgroep}}.

#{{hashtag1}} #{{hashtag2}} #{{hashtag3}}

Wie is er net zo excited als wij? 🤩`,
          variables: {
            nieuwe_feature: 'AI Content Generator',
            feature_beschrijving: 'Een revolutionaire tool die...',
            voordelen: '• 10x sneller content maken\n• Altijd optimale resultaten\n• Persoonlijk advies',
            beschikbaar_datum: 'maandag',
            doelgroep: 'alle gebruikers',
            hashtag1: 'NieuweFeature',
            hashtag2: 'AI',
            hashtag3: 'Innovation'
          }
        };

      case 'celebration':
        return {
          name: 'Celebratie Template',
          content: `🎉 Wat een mijlpaal! 

{{mijlpaal_beschrijving}}

{{achtergrond_verhaal}}

Dit succes is mogelijk gemaakt door:
{{bijdragers}}

En natuurlijk onze geweldige community! 🙏

#{{hashtag1}} #{{hashtag2}} #{{hashtag3}}

Wat is jullie volgende doel? Deel het hieronder! 👇`,
          variables: {
            mijlpaal_beschrijving: 'We hebben de 1000e tevreden klant bereikt!',
            achtergrond_verhaal: 'Sinds onze start vorig jaar...',
            bijdragers: '• Ons dedicated team\n• Jullie waardevolle feedback\n• Continue innovatie',
            hashtag1: 'Milestone',
            hashtag2: 'Success',
            hashtag3: 'Growth'
          }
        };

      default:
        return {
          name: 'Standaard Template',
          content: `{{bericht_inhoud}}

{{call_to_action}}

#{{hashtag1}} #{{hashtag2}}`,
          variables: {
            bericht_inhoud: 'Jouw professionele content hier...',
            call_to_action: 'Wat vind jij hiervan?',
            hashtag1: 'LinkedIn',
            hashtag2: 'Business'
          }
        };
    }
  }
}