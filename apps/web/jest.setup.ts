import "@testing-library/jest-dom";
import {
	TextDecoder as NodeTextDecoder,
	TextEncoder as NodeTextEncoder,
} from "util";

if (typeof global.TextDecoder === "undefined") {
	global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
}

if (typeof global.TextEncoder === "undefined") {
	global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
}
