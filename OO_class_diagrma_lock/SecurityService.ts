import { ISecurable } from "./ISecurable.ts";

export class SecurityService {
    checkSecurity(object: ISecurable): boolean {
        console.log(`\n🕵️  SCANNING: ${object.getName()}...`);
        const components = object.getComponents();
        let allSecure = true;

        console.log("------------------------------------------------");
        console.log(`| TYPE   | NAME           | STATUS   |`);
        console.log("------------------------------------------------");

        for (const comp of components) {
            const isLocked = comp.isLocked();
            const statusIcon = isLocked ? "✅ LOCKED" : "❌ OPEN";
            const type = comp.constructor.name.padEnd(6);
            const name = comp.name.padEnd(14);

            console.log(`| ${type} | ${name} | ${statusIcon.padEnd(8)} |`);

            if (!isLocked) allSecure = false;
        }
        console.log("------------------------------------------------");

        if (allSecure) {
            console.log(`🛡️  RESULT: SYSTEM SECURE`);
        } else {
            console.log(`⚠️  RESULT: SECURITY BREACH DETECTED`);
        }

        return allSecure;
    }
}
