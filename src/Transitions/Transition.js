import Highway from "@dogstudio/highway";
export default class Transition extends Highway.Transition {

    in ({
        from,
        to,
        done
    }) {

        from.remove();
        done();

    }

    out({
        from,
        done
    }) {

        done();

    }

}