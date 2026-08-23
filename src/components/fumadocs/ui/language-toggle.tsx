"use client";
import type {ComponentProps} from "react";
export type LanguageSelectProps = ComponentProps<"button">;
export function LanguageToggle(props: LanguageSelectProps){ return <button type="button" {...props}>{props.children}</button>; }
export function LanguageToggleText(props: ComponentProps<"span">){ return <span {...props}>English</span>; }
export function LanguageToggleSlot(props: ComponentProps<"button">){ return <LanguageToggle {...props} />; }