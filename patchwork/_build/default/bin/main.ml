open! Js_of_ocaml
open Patchwork
module C = Js_of_ocaml.Console

let log s = C.(console##log (Js.string s))

let get_svg_image_exn id : Dom_svg.imageElement Js.t =
  let el = Dom_html.getElementById_exn id in
  (Js.Unsafe.coerce el : Dom_svg.imageElement Js.t)

let unwrap_exn opt =
  match opt with
  | Some x -> x
  | None -> failwith "Tried to unwrap None"

let _main_board_positions player slot =
  if player = 1 then
    match slot with
    | 1 -> (24.0, 18.0, 8.0)
    | 2 -> (32.0, 15.0, 8.0)
    | 3 -> (40.7, 14.0, 8.0)
    | 4 -> (49.0, 14.0, 8.0)
    | 5 -> (57.8, 15.0, 8.0)
    | 6 -> (66.0, 19.0, 8.0)
    | 7 -> (71.0, 26.0, 8.0)
    | 8 -> (74.0, 34.0, 8.0)
    | 9 -> (75.0, 43.0, 8.0)
    | 10 -> (74.5, 50.0, 8.0)
    | _ -> (0.0, 0.0, 0.0)
  else
    match slot with
    | 1 -> (20.0, 10.0, 10.0)
    | 2 -> (30.0, 6.0, 10.0)
    | 3 -> (40.0, 5.0, 10.0)
    | 4 -> (50.5, 5.0, 10.0)
    | 5 -> (60.0, 7.0, 10.0)
    | 6 -> (70.0, 11.0, 10.0)
    | 7 -> (76.0, 20.0, 10.0)
    | 8 -> (80.0, 31.0, 10.0)
    | 9 -> (82.0, 41.0, 10.0)
    | 10 -> (81.0, 50.0, 10.0)
    | _ -> (0.0, 0.0, 0.0)

let initialize_game pname = _init pname
let current_state : Game_state.t option ref = ref None
let pending_patch_index : int option ref = ref None
(*
let init_replica_grid ~cols () =
  let doc = Dom_html.document in
  let cells = doc##querySelectorAll (Js.string "#patch_chosen .replica-cell") in
  for i = 0 to cells##.length - 1 do
    Js.Opt.iter
      (cells##item i)
      (fun n ->
        let cell = (Js.Unsafe.coerce n : Dom_html.element Js.t) in
        let row = (i / cols) + 1 in
        let col = (i mod cols) + 1 in
        (* Store as data-* for easy reads *)
        cell##setAttribute (Js.string "data-row") (Js.string (string_of_int row));
        cell##setAttribute (Js.string "data-col") (Js.string (string_of_int col));

        cell##.onclick :=
          Dom_html.handler (fun _ev ->
              let r =
                int_of_string (Js.to_string (cell##getAttribute (Js.string "data-row")))
              in
              let c =
                int_of_string (Js.to_string (cell##getAttribute (Js.string "data-col")))
              in
              Firebug.console##log
                (Js.string (Printf.sprintf "clicked cell r=%d c=%d" r c));
              Js._false))
              done *)

let button_image_get_src num_buttons =
  if num_buttons >= 50 then "svgs/50_stack_buttons.svg"
  else if num_buttons >= 40 then "svgs/40_stack_buttons.svg"
  else if num_buttons >= 30 then "svgs/30_stack_buttons.svg"
  else if num_buttons >= 20 then "svgs/20_stack_buttons.svg"
  else if num_buttons >= 10 then "svgs/10_stack_buttons.svg"
  else if num_buttons >= 5 then "svgs/5_stack_buttons.svg"
  else "svgs/1_stack_buttons.svg"

let set_button_count_and_src ~count ~txt_count_id ~image_id =
  let button_text = Dom_html.getElementById_exn txt_count_id in
  button_text##.textContent := Js.some (Js.string (string_of_int count));
  let image = Dom_html.getElementById_exn image_id in
  image##setAttribute (Js.string "src") (Js.string (button_image_get_src count))

let update_buttons_ui (player : Player.t) player_num =
  let count = player.buttons_owned in
  if player_num = 1 then
    set_button_count_and_src ~count ~txt_count_id:"p1_buttons" ~image_id:"p1_buttons_img"
  else
    set_button_count_and_src ~count ~txt_count_id:"p2_buttons" ~image_id:"p2_buttons_img"

let rec find_patch_name pl i =
  match pl with
  | [] -> "Empty"
  | (hd : Patch.t) :: tl ->
      if hd.pos_around_board = i then
        Sexplib.Sexp.to_string_hum (Patch.sexp_of_patch_shape hd.shape)
      else find_patch_name tl i

let rec place_patch_images_around_circle pl =
  let add_patch_image_src n patch_id =
    let patch_name = find_patch_name pl n in
    let patch_shape = Patch.patch_shape_of_sexp (Sexplib.Sexp.of_string patch_name) in
    let col, row = Patch.get_col_row patch_shape in
    let img_src = "svgs/" ^ patch_name ^ ".svg" in
    let patch_image = Dom_html.getElementById_exn patch_id in
    let patch_cont = Dom_html.getElementById_exn ("ptch" ^ string_of_int (n - 1)) in
    let no_priority : Js.js_string Js.t Js.optdef = Js.undefined in
    patch_image##setAttribute (Js.string "src") (Js.string img_src);
    ignore
      (patch_cont##.style##setProperty
         (Js.string "--cols")
         (Js.string (string_of_int col))
         no_priority);
    ignore
      (patch_cont##.style##setProperty
         (Js.string "--rows")
         (Js.string (string_of_int row))
         no_priority)
  in
  match pl with
  | [] -> ()
  | hd :: tl ->
      let id = "patch" ^ string_of_int (hd.pos_around_board - 1) in
      add_patch_image_src hd.pos_around_board id;
      place_patch_images_around_circle tl

let set_patch_choice_srcs () =
  let p1_img = Dom_html.getElementById_exn "patch1_image" in
  let p2_img = Dom_html.getElementById_exn "patch2_image" in
  let p3_img = Dom_html.getElementById_exn "patch3_image" in
  let p1_num, p2_num, p3_num =
    Patch.get_three (unwrap_exn !current_state).neut.pos
      (unwrap_exn !current_state).patches_remaining
  in
  let p1_name = find_patch_name (unwrap_exn !current_state).patches p1_num in
  let p2_name = find_patch_name (unwrap_exn !current_state).patches p2_num in
  let p3_name = find_patch_name (unwrap_exn !current_state).patches p3_num in
  let p1_cost = Dom_html.getElementById_exn "patch1_cost" in
  let p1_time = Dom_html.getElementById_exn "patch1_time" in
  let p2_cost = Dom_html.getElementById_exn "patch2_cost" in
  let p2_time = Dom_html.getElementById_exn "patch2_time" in
  let p3_cost = Dom_html.getElementById_exn "patch3_cost" in
  let p3_time = Dom_html.getElementById_exn "patch3_time" in
  let p1_shape = Patch.patch_shape_of_sexp (Sexplib.Sexp.of_string p1_name) in
  let p2_shape = Patch.patch_shape_of_sexp (Sexplib.Sexp.of_string p2_name) in
  let p3_shape = Patch.patch_shape_of_sexp (Sexplib.Sexp.of_string p3_name) in
  let p1c, p1t = Patch.get_values p1_shape in
  let p2c, p2t = Patch.get_values p2_shape in
  let p3c, p3t = Patch.get_values p3_shape in
  p1_cost##.textContent := Js.some (Js.string (string_of_int p1c ^ " buttons"));
  p2_cost##.textContent := Js.some (Js.string (string_of_int p2c ^ " buttons"));
  p3_cost##.textContent := Js.some (Js.string (string_of_int p3c ^ " buttons"));
  p1_time##.textContent := Js.some (Js.string (string_of_int p1t ^ " steps"));
  p2_time##.textContent := Js.some (Js.string (string_of_int p2t ^ " steps"));
  p3_time##.textContent := Js.some (Js.string (string_of_int p3t ^ " steps"));
  let p1_src = "svgs/" ^ p1_name ^ ".svg" in
  let p2_src = "svgs/" ^ p2_name ^ ".svg" in
  let p3_src = "svgs/" ^ p3_name ^ ".svg" in
  p1_img##setAttribute (Js.string "src") (Js.string p1_src);
  p2_img##setAttribute (Js.string "src") (Js.string p2_src);
  p3_img##setAttribute (Js.string "src") (Js.string p3_src)

let position_token_on_board (img : Dom_svg.imageElement Js.t) n =
  let state = unwrap_exn !current_state in
  let x, y, s =
    if n = 1 then _main_board_positions 1 state.tk1.position
    else _main_board_positions 2 state.tk2.position
  in
  let x_str = Printf.sprintf "%.0f%%" x |> Js.string in
  let y_str = Printf.sprintf "%.0f%%" y |> Js.string in
  let sx_str = Printf.sprintf "%.0f%%" s |> Js.string in
  let sy_str = Printf.sprintf "%.0f%%" s |> Js.string in
  img##setAttribute (Js.string "x") x_str;
  img##setAttribute (Js.string "y") y_str;
  img##setAttribute (Js.string "width") sx_str;
  img##setAttribute (Js.string "height") sy_str

let _mount_patch ~(grid_id : string) ~(row : int) ~(col : int) ~(rows : int) ~(cols : int)
    ~(img_src : string) : unit =
  let no_priority : Js.js_string Js.t Js.optdef = Js.undefined in
  let grid = Dom_html.getElementById_exn grid_id in
  let patch = Dom_html.createDiv Dom_html.document in
  patch##.className := Js.string "patch-item";
  ignore
    (patch##.style##setProperty
       (Js.string "grid-row")
       (Js.string (Printf.sprintf "%d / span %d" (row + 1) rows))
       no_priority);
  ignore
    (patch##.style##setProperty
       (Js.string "grid-column")
       (Js.string (Printf.sprintf "%d / span %d" (col + 1) cols))
       no_priority);
  let img = Dom_html.createImg Dom_html.document in
  img##.src := Js.string img_src;
  Dom.appendChild patch img |> ignore;
  Dom.appendChild grid patch |> ignore

let () =
  Dom_html.window##.onload :=
    Dom_html.handler (fun _ ->
        let _quilt_board = Dom_html.getElementById_exn "qb_replica" in
        let intro = Dom_html.getElementById "intro" in
        let container = Dom_html.getElementById "container" in
        let patch_interface = Dom_html.getElementById_exn "choose_patch" in
        let blur = Dom_html.getElementById_exn "blur" in
        let cube_token = get_svg_image_exn "cube_tt" in
        let patch_chosen = Dom_html.getElementById_exn "patch_chosen" in
        let pyramid_token = get_svg_image_exn "pyramid_tt" in
        let advance_button =
          Dom_html.getElementById_coerce "advance" Dom_html.CoerceTo.button
        in
        let place_patch_button =
          Dom_html.getElementById_coerce "place_patch" Dom_html.CoerceTo.button
        in
        let start_game_button =
          Dom_html.getElementById_coerce "start_game" Dom_html.CoerceTo.button
        in
        let go_back_button =
          Dom_html.getElementById_coerce "cancel_patch" Dom_html.CoerceTo.button
        in
        let cancel_place_patch_button =
          Dom_html.getElementById_coerce "cancel_pp" Dom_html.CoerceTo.button
        in

        let choose_patch_1_button =
          Dom_html.getElementById_coerce "choose1" Dom_html.CoerceTo.button
        in
        (*        let choose_patch_2_button =
          Dom_html.getElementById_coerce "choose2" Dom_html.CoerceTo.button
        in
        let choose_patch_3_button =
        Dom_html.getElementById_coerce "choose3" Dom_html.CoerceTo.button
        in*)
        let player_name =
          Dom_html.getElementById_coerce "player_name" Dom_html.CoerceTo.input
        in
        intro##.style##.display := Js.string "block";
        container##.style##.display := Js.string "none";
        (match advance_button with
        | None -> log "Missing advance button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  let current_player = (unwrap_exn !current_state).turn in
                  current_state :=
                    Some (Move.choose_move (unwrap_exn !current_state) Advance 0 0 0);
                  if current_player.player_num = 1 then (
                    position_token_on_board cube_token 1;
                    update_buttons_ui current_player 1;
                    Js._false)
                  else (
                    position_token_on_board pyramid_token 2;
                    update_buttons_ui current_player 2;
                    Js._false)));

        (match place_patch_button with
        | None -> log "Missing place patch button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  patch_interface##.style##.display := Js.string "block";
                  blur##.style##.display := Js.string "block";
                  set_patch_choice_srcs ();
                  Js._false));
        (match choose_patch_1_button with
        | None -> log "Missing choose patch button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  let patch_index, _, _ =
                    Patch.get_three (unwrap_exn !current_state).neut.pos
                      (unwrap_exn !current_state).patches_remaining
                  in
                  pending_patch_index := Some patch_index;
                  patch_interface##.style##.display := Js.string "none";
                  blur##.style##.display := Js.string "none";
                  container##.style##.display := Js.string "none";
                  patch_chosen##.style##.display := Js.string "grid";
                  Js._false));
        (match cancel_place_patch_button with
        | None -> log "Missing go back button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  patch_chosen##.style##.display := Js.string "none";
                  container##.style##.display := Js.string "grid";
                  blur##.style##.display := Js.string "none";
                  Js._false));
        (match go_back_button with
        | None -> log "Missing go back button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  patch_interface##.style##.display := Js.string "none";
                  blur##.style##.display := Js.string "none";
                  Js._false));
        (match start_game_button with
        | None -> log "Missing start button."
        | Some btn ->
            btn##.onclick :=
              Dom_html.handler (fun _ ->
                  intro##.style##.display := Js.string "none";
                  container##.style##.display := Js.string "grid";
                  let raw_input =
                    match player_name with
                    | None ->
                        log "Player name input not found.";
                        "Player"
                    | Some input -> Js.to_string input##.value
                  in
                  let pname = raw_input |> String.trim in
                  let pname = if pname = "" then "Player" else pname in
                  let state = initialize_game pname in
                  current_state := Some state;
                  place_patch_images_around_circle state.patches;
                  position_token_on_board cube_token 1;
                  position_token_on_board pyramid_token 2;
                  let count = 5 in
                  set_button_count_and_src ~count ~txt_count_id:"p1_buttons"
                    ~image_id:"p1_buttons_img";
                  set_button_count_and_src ~count ~txt_count_id:"p2_buttons"
                    ~image_id:"p2_buttons_img";
                  log "Game started.";
                  Js._false));
        Js._false)
