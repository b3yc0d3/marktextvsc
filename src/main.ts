import * as vscode from 'vscode';
const LSCOPE = 'marktext';

function activate(context: vscode.ExtensionContext) {
    console.log("[MT] Ready")

    /**
     * All Command Words.
     *  - ce
     *  - el
     *  - hr
     *  - nr
     *  - ph
     *  - tl
     */
    const registerCIP_CommandWords = vscode.languages.registerCompletionItemProvider(LSCOPE, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

            const linePrefix = document.lineAt(position).text.substr(0, position.character);

            if (linePrefix.startsWith('.')) {

                // Center Lines (.ce <number>)
                const snipCom_CE = new vscode.CompletionItem('ce', vscode.CompletionItemKind.Function);
                snipCom_CE.detail = "(command word) .ce <lines>";
                snipCom_CE.insertText = new vscode.SnippetString('ce ${1:lines}  \n${2}');
                const snipCom_CE_doc = new vscode.MarkdownString("Center following Line(s).  \n");
                snipCom_CE_doc.appendMarkdown("It will center nth given line(s) that are following.\n\n");
                snipCom_CE_doc.appendMarkdown("**Args:**  \n`lines` line(s) to center\n\n");
                snipCom_CE_doc.appendMarkdown("**Example:**");
                snipCom_CE_doc.appendCodeblock(".ce 2  \nFirst line to center\nSecond line to center");
                snipCom_CE.documentation = snipCom_CE_doc;


                // Empty Lines (.el <number>)
                const snipCom_EL = new vscode.CompletionItem('el', vscode.CompletionItemKind.Function);
                snipCom_EL.detail = "(command word) .el <lines>";
                snipCom_EL.insertText = new vscode.SnippetString('cl ${1:lines}');
                const snipCom_EL_doc = new vscode.MarkdownString("Add Empty line(s)  \n");
                snipCom_EL_doc.appendMarkdown("It will add nth empty lines to the document.\n\n");
                snipCom_EL_doc.appendMarkdown("**Args:**  \n`lines` empty line(s) to add\n\n");
                snipCom_EL_doc.appendMarkdown("**Example:**");
                snipCom_EL_doc.appendCodeblock(".el 2");
                snipCom_EL.documentation = snipCom_EL_doc;


                // Header (.hr <1 / 2 / 3>)
                const snipCom_HR = new vscode.CompletionItem('hr', vscode.CompletionItemKind.Function);
                snipCom_HR.detail = "(command word) .hr <level>";
                snipCom_HR.insertText = new vscode.SnippetString('hr ${1:level}  \n${2:title}');
                const snipCom_HR_doc = new vscode.MarkdownString("Create Header with level from 1-3\n\n");
                snipCom_HR_doc.appendMarkdown("**Args:**  \n`level` can be 1-3  \n");
                snipCom_HR_doc.appendMarkdown("`title` can be any valid UTF-8 character\n\n");
                snipCom_HR_doc.appendMarkdown("**Example:**");
                snipCom_HR_doc.appendCodeblock(".hr 2  \nThis is a title");
                snipCom_HR.documentation = snipCom_HR_doc;


                // New Register (.nr <IDENTIFIER> <VALUE>)
                const snipCom_NR = new vscode.CompletionItem('nr', vscode.CompletionItemKind.Function);
                snipCom_NR.detail = "(command word) .nr <IDENTIFIER> <number>";
                snipCom_NR.insertText = new vscode.SnippetString('nr ${1:identifier} ${2:value}');
                const snipCom_NR_doc = new vscode.MarkdownString("Create Register or set value of one\n\n");
                snipCom_NR_doc.appendMarkdown("**Args:**  \n`identifier` can contain A-Z and _ (*musst be uppercase*)  \n");
                snipCom_NR_doc.appendMarkdown("`value` can contain any valid UTF-8 character or numbers\n\n");
                snipCom_NR_doc.appendMarkdown("**Example:**");
                snipCom_NR_doc.appendCodeblock(".nr AUTHOR \"John Doe\" // Text must be qouted  \n");
                snipCom_NR_doc.appendCodeblock(".nr PAGES 69          // Stores numbers");
                snipCom_NR.documentation = snipCom_NR_doc;


                // Paragraph (.ph <VALUE>)
                const snipCom_PH = new vscode.CompletionItem('ph', vscode.CompletionItemKind.Function);
                snipCom_PH.detail = "(command word) .p  \n<value>";
                snipCom_PH.insertText = new vscode.SnippetString('ph\n${1:value}');
                const snipCom_PH_doc = new vscode.MarkdownString("Create a Paragraph\n\n");
                snipCom_PH_doc.appendMarkdown("**Args:**  \n`value` can contain any valid UTF-8 character\n\n");
                snipCom_PH_doc.appendMarkdown("**Example:**");
                snipCom_PH_doc.appendCodeblock(".ph  \nThis is paragraph text.");
                snipCom_PH.documentation = snipCom_PH_doc;


                // Title (.tl '<VALUE>'<value>'<value>')
                const snipCom_TL = new vscode.CompletionItem('tl', vscode.CompletionItemKind.Function);
                snipCom_TL.detail = "(command word) .tl '<left>'<center>'<right>'";
                snipCom_TL.insertText = new vscode.SnippetString('tl \'${1}\'${2}\'${3}\'');
                const snipCom_TL_doc = new vscode.MarkdownString("Document Title\n\n");
                snipCom_TL_doc.appendMarkdown("The argument `left` will be pushed to start of line, ");
                snipCom_TL_doc.appendMarkdown("`center` will be centerd in line and ");
                snipCom_TL_doc.appendMarkdown("`right` will be be pushed to the line end.\n\n");
                snipCom_TL_doc.appendMarkdown("**Args:**  \n");
                snipCom_TL_doc.appendMarkdown("`left` can contain any UTF-8 character.  \n");
                snipCom_TL_doc.appendMarkdown("`center` can contain any UTF-8 character.  \n");
                snipCom_TL_doc.appendMarkdown("`right` can contain any UTF-8 character.\n\n");
                snipCom_TL_doc.appendMarkdown("**Example:**");
                snipCom_TL_doc.appendCodeblock(".tl  'Left Text'Centered Text'Right Text'");
                snipCom_TL.documentation = snipCom_TL_doc;


                return [
                    snipCom_CE,
                    snipCom_EL,
                    snipCom_HR,
                    snipCom_NR,
                    snipCom_PH,
                    snipCom_TL
                ];
            }

            return undefined;
        }
    }, '.');

    /**
     * All Placeholder.
     *  - $()
     */
    const registerCIP_Placeholder = vscode.languages.registerCompletionItemProvider(LSCOPE, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);

            if (linePrefix.endsWith("$") || linePrefix.endsWith("$(")) {
                // Placeholder ($(<IDENTIFIER>))
                const details = "(reference) $(<identifier>)";
                const insertText = new vscode.SnippetString('(${1:identifier})');

                const snipCom_Placeholder = new vscode.CompletionItem('$' || '$(', vscode.CompletionItemKind.Reference);
                snipCom_Placeholder.detail = details;
                snipCom_Placeholder.insertText = insertText;

                const snipCom_Placeholder_doc = new vscode.MarkdownString("Used to insert value from Register\n\n");
                snipCom_Placeholder_doc.appendMarkdown("**Args:**  \n`identifier` can contain A-Z and _ (*musst be uppercase*)\n\n");
                snipCom_Placeholder_doc.appendMarkdown("**Example:**");
                snipCom_Placeholder_doc.appendCodeblock(".tl 'Author:''$(AUTHOR)'  // 'AUTHOR' needs to be declared before");
                
                snipCom_Placeholder.documentation = snipCom_Placeholder_doc;

                return [
                    snipCom_Placeholder,
                ];
            }

            return undefined;
        },
    }, '$')


    context.subscriptions.push(registerCIP_CommandWords, registerCIP_Placeholder);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}
